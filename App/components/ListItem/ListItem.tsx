// shoot
// Copyright (C) 2018-2020  James Lee

// shoot is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// shoot is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with shoot.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';

import gpsIcon from '../../../assets/images/location-big.png';
import pinIcon from '../../../assets/images/location.png';
import * as theme from '../../util/theme';

interface ListItemProps extends TouchableOpacityProps {
  description: string;
  icon: 'pin' | 'gps';
  title: string;
}

const styles = StyleSheet.create({
  container: {
    ...theme.withPadding,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: theme.spacing.normal
  },
  description: {
    ...theme.text
  },
  result: {
    marginLeft: theme.spacing.normal
  },
  title: {
    ...theme.title
  }
});

export function ListItem(props: ListItemProps): React.ReactElement {
  const { description, icon, title, ...rest } = props;

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image source={icon === 'gps' ? gpsIcon : pinIcon} />
      <View style={styles.result}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}